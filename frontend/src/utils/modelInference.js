/**
 * ONNX Model Inference
 * Performs predictions using the converted house_price_model.onnx
 */

import * as ort from 'onnxruntime-web';

// Singleton session instance
let sessionInstance = null;

/**
 * Initialize the ONNX session
 */
export async function initializePredictor() {
  if (sessionInstance) {
    return sessionInstance;
  }

  try {
    console.log('Loading ONNX model...');
    
    // Load the ONNX model
    sessionInstance = await ort.InferenceSession.create('/house_price_model.onnx');
    
    console.log('✓ ONNX model loaded successfully');
    return sessionInstance;
  } catch (error) {
    console.error('Error loading ONNX model:', error);
    throw error;
  }
}

/**
 * Make a prediction using the ONNX model
 */
export async function predictHousePrice(inputData) {
  if (!sessionInstance) {
    await initializePredictor();
  }

  const {
    category,
    type,
    city,
    region,
    room_count,
    bathroom_count,
    size
  } = inputData;

  // Apply log transformation (matching backend preprocessing)
  const room_count_log = Math.log1p(room_count);
  const bathroom_count_log = Math.log1p(bathroom_count);
  const size_log = Math.log1p(size);

  // Create feature array in the correct order
  const features = [
    category,
    type,
    city,
    region,
    room_count_log,
    bathroom_count_log,
    size_log
  ];

  // Create input tensor
  const inputTensor = new ort.Tensor('float32', Float32Array.from(features), [1, 7]);

  // Run inference
  const feeds = { float_input: inputTensor };
  const results = await sessionInstance.run(feeds);

  // Get the output (log10 prediction)
  const outputTensor = results.variable;
  const log10_price = outputTensor.data[0];

  // Convert back to actual price
  const price = Math.pow(10, log10_price);

  return price;
}
