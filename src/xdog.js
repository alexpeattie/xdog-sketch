import { Array3D, Array4D, NDArrayMathCPU, NDArrayMathGPU, Scalar } from 'deeplearn'
import generateGuassianKernel from 'gaussian-convolution-kernel'
import streamToPromise from 'stream-to-promise'
import savePixels from 'save-pixels'
import ndarray from 'ndarray'

// Convenience method for initializing scalars
const s = n => Scalar.new(n)

export function convertToGrayscale(pixels) {
  const math = window.WebGLRenderingContext ? new NDArrayMathGPU() : new NDArrayMathCPU()
  const [width, height, channels] = pixels.shape

  const color = math.transpose(Array3D.new([height, width, channels], pixels.data), [1, 0, 2]).reshape(pixels.shape)

  const r = math.multiply(math.slice3D(color, [0, 0, 0], [width, height, 1]), s(0.299))
  const g = math.multiply(math.slice3D(color, [0, 0, 1], [width, height, 1]), s(0.587))
  const b = math.multiply(math.slice3D(color, [0, 0, 2], [width, height, 1]), s(0.114))

  return math.add(r, math.add(g, b)).data()
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

export function DoGFilter(pixels, options, shape) {
  const { sigmaOne, sigmaTwo, threshold, gpuAccelerated } = options
  const math = gpuAccelerated ? (new NDArrayMathGPU()) : (new NDArrayMathCPU())

  return new Promise((resolve, reject) => {
    const original = Array3D.new([...shape, 1], pixels)

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, original, kernelOne), applyConvolution(math, original, kernelTwo)]

    const diff = math.subtract(imgA, imgB)
    const diffPositive = math.subtract(diff, math.min(diff))
    const relativeDiff = math.divide(diffPositive, math.max(diffPositive))

    const result = math.multiply(math.step(math.subtract(relativeDiff, s(threshold))), s(255))

    result.data().then(sketchPixels => {
      const pixelArray = ndarray(sketchPixels, shape)
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

export function XDoGFilter(pixels, options, shape) {
  const { sigmaOne, sigmaTwo, sharpen, epsilon, phi, gpuAccelerated } = options
  const math = gpuAccelerated ? (new NDArrayMathGPU()) : (new NDArrayMathCPU())

  return new Promise((resolve, reject) => {
    const original = Array3D.new([...shape, 1], pixels)
    const rescaled = math.divide(original, s(255))

    const [kernelOne, kernelTwo] = [guassianKernel(sigmaOne), guassianKernel(sigmaTwo)]
    const [imgA, imgB] = [applyConvolution(math, rescaled, kernelOne), applyConvolution(math, rescaled, kernelTwo)]

    const scaledDiff = math.subtract(math.multiply(s(sharpen + 1), imgA), math.multiply(s(sharpen), imgB))
    const sharpened = math.multiply(math.multiply(rescaled, scaledDiff), s(255))
    const mask = math.step(math.subtract(math.multiply(rescaled, scaledDiff), s(epsilon)))
    const inverseMask = math.add(math.multiply(mask, s(-1)), s(1))

    const softThresholded = math.add(s(1), softThreshold(math, sharpened, phi, epsilon))
    const result = math.multiply(math.add(mask, math.multiply(inverseMask, softThresholded)), s(255))
    const resultScaled = math.multiply(math.divide(result, math.max(result)), s(255))

    resultScaled.data().then(sketchPixels => {
      const pixelArray = ndarray(sketchPixels, shape)
      streamToPromise(savePixels(pixelArray, 'png')).then(buffer => {
        const image = 'data:image/png;base64,' + buffer.toString('base64')
        resolve(image)
      })
    })
  })
}