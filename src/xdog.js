import { Array3D, Array4D, NDArrayMathCPU, NDArrayMathGPU, Scalar } from 'deeplearn'
import generateGuassianKernel from 'gaussian-convolution-kernel'
import streamToPromise from 'stream-to-promise'
import zeros from 'zeros'
import cwise from 'cwise'
import savePixels from 'save-pixels'
import ndarray from 'ndarray'
import { gtseq } from 'ndarray-ops'

function convertToGrayscale(pixels) {
  // Adapted from https://github.com/scijs/luminance/blob/master/lum.js

  const [width, height, ...rest] = pixels.shape // eslint-disable-line no-unused-vars
  const computeLuminance = cwise({
    args: ["array", "array", "array", "array"],
    body(out, r, g, b) {
      out = 0.299 * r + 0.587 * g + 0.114 * b
    }
  })

  let grayscale = zeros([width, height], pixels.dtype)
  computeLuminance(grayscale, pixels.pick(null, null, 0), pixels.pick(null, null, 1), pixels.pick(null, null, 2))

  return grayscale
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

  const { sigmaOne, sigmaTwo, threshold } = options

  return new Promise((resolve, reject) => {
    const original = Array3D.new([...grayscale.shape, 1], grayscale.data)

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, original, kernelOne), applyConvolution(math, original, kernelTwo)]

    const diff = math.subtract(imgA, imgB)
    const diffPositive = math.subtract(diff, math.min(diff))
    const relativeDiff = math.divide(diffPositive, math.max(diffPositive))

    const result = math.multiply(math.step(math.subtract(relativeDiff, s(threshold))), s(255))

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
    const rescaled = math.divide(original, s(255))
    const { sigmaOne, sigmaTwo, sharpen, epsilon, phi } = options

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, rescaled, kernelOne), applyConvolution(math, rescaled, kernelTwo)]

    const scaledDiff = math.subtract(math.multiply(s(sharpen + 1), imgA), math.multiply(s(sharpen), imgB))
    const sharpened = math.multiply(math.multiply(rescaled, scaledDiff), s(255))

    sharpened.data().then(sharpenedData => {
      const sharpenedPixels = ndarray(sharpenedData, sharpenedData.shape)
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