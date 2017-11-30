import { Array3D, Array4D, NDArrayMathCPU, NDArrayMathGPU, Scalar } from 'deeplearn'
import generateGuassianKernel from 'gaussian-convolution-kernel'
import streamToPromise from 'stream-to-promise'
import zeros from 'zeros'
import luminance from 'luminance'
import savePixels from 'save-pixels'
import ndarray from 'ndarray'
import { gtseq } from 'ndarray-ops'

function convertToGrayscale(pixels) {
  const [width, height, ...rest] = pixels.shape // eslint-disable-line no-unused-vars

  let grayscale = zeros([width, height], pixels.dtype)
  return luminance(grayscale, pixels)
}

function calculateKernelSize(sigma) {
  return Math.max(Math.round(sigma * 3) * 2 + 1, 3)
}

function guassianKernel(sigma) {
  const ks = calculateKernelSize(sigma)
  return Array4D.new([ks, ks, 1, 1], generateGuassianKernel(ks, sigma))
}

function applyConvolution(math, original, kernel) {
  return math.conv2d(original, kernel, null, 1, 'same')
}

// Convenience method for initializing scalars
const s = n => Scalar.new(n)

export function DoGFilter(pixels, options) {
  console.log(options.gpuAccelerated)
  const math = options.gpuAccelerated ? (new NDArrayMathGPU()) : (new NDArrayMathCPU())
  const grayscale = convertToGrayscale(pixels)

  const { sigmaOne, sigmaTwo } = options

  return new Promise((resolve, reject) => {
    const original = Array3D.new([...grayscale.shape, 1], grayscale.data)

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, original, kernelOne), applyConvolution(math, original, kernelTwo)]
    
    const diff = math.subtract(imgA, imgB)
    const result = math.add(s(255), math.multiply(s(-1), diff))

    result.data().then(sketchPixels => {
      const pixelArray = ndarray(sketchPixels, grayscale.shape)
      streamToPromise(savePixels(pixelArray, 'png')).then(buffer => {
        const image = 'data:image/png;base64,' + buffer.toString('base64')
        resolve(image)
      })
    })
  })
}

function softThreshold(math, pixels, phi, epsilon) {
  return math.tanh(math.multiply(s(phi), math.subtract(pixels, s(epsilon))))
}

export function XDoGFilter(pixels, options) {
  const math = options.gpuAccelerated ? (new NDArrayMathGPU()) : (new NDArrayMathCPU())
  const grayscale = convertToGrayscale(pixels)

  return new Promise((resolve, reject) => {
    const original = Array3D.new([...grayscale.shape, 1], grayscale.data)
    const { sigmaOne, sigmaTwo, scale, epsilon, phi } = options

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, original, kernelOne), applyConvolution(math, original, kernelTwo)]

    const scaledDiff = math.subtract(math.multiply(s(scale + 1), imgA), math.multiply(s(scale), imgB))
    const sharpened = math.multiply(original, scaledDiff)

    sharpened.data().then(sharpenedData => {
      const sharpenedPixels = ndarray(sharpenedData, sharpenedData.shape)
      console.log(sharpenedPixels.data)
      const mask = Array3D.new(original.shape, gtseq(sharpenedPixels, epsilon).data)
      const inverseMask = math.add(math.multiply(mask, s(-1)), s(1))

      const softThresholded = math.add(s(1), softThreshold(math, sharpened, phi, epsilon))
      const result = math.multiply(math.add(mask, math.multiply(inverseMask, softThresholded)), s(255))

      result.data().then(sketchPixels => {
        const pixelArray = ndarray(sketchPixels, grayscale.shape)
        streamToPromise(savePixels(pixelArray, 'png')).then(buffer => {
          const image = 'data:image/png;base64,' + buffer.toString('base64')
          resolve(image)
        })
      })
    })
  })
}