const pad = new Array(30).fill(null);
const mastersCoefficients = [...pad,
  1.000, 1.016, 1.031, 1.046,
  1.059, 1.072, 1.083, 1.096,
  1.109, 1.122, 1.135, 1.149,
  1.162, 1.176, 1.189, 1.203,
  1.218, 1.233, 1.248, 1.263,
  1.279, 1.297, 1.316, 1.338,
  1.361, 1.385, 1.411, 1.437,
  1.462, 1.488, 1.514, 1.541,
  1.568, 1.598, 1.629, 1.663,
  1.699, 1.738, 1.779, 1.823,
  1.867, 1.910, 1.953, 2.004,
  2.060, 2.117, 2.181, 2.255,
  2.336, 2.419, 2.504, 2.597,
  2.702, 2.831, 2.981, 3.153,
  3.352, 3.580, 3.843, 4.145,
  4.493
];

module.exports = mastersCoefficients;
