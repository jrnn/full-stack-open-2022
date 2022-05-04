enum BmiCategory {
  UNDERWEIGHT_SEVERE = "Severely underweight",
  UNDERWEIGHT_MODERATE = "Moderately underweight",
  UNDERWEIGHT_MILD = "Mildly underweight",
  NORMAL = "Normal weight",
  OVERWEIGHT = "Overweight",
  OBESE_MILD = "Obese (Class I)",
  OBESE_MODERATE = "Obese (Class II)",
  OBESE_SEVERE = "Obese (Class III)"
}

const toBmiCategory = (bmi: number): BmiCategory => {
  switch (true) {
    case (bmi < 16):
      return BmiCategory.UNDERWEIGHT_SEVERE
    case (bmi < 17):
      return BmiCategory.UNDERWEIGHT_MODERATE
    case (bmi < 18.5):
      return BmiCategory.UNDERWEIGHT_MILD
    case (bmi < 25):
      return BmiCategory.NORMAL
    case (bmi < 30):
      return BmiCategory.OVERWEIGHT
    case (bmi < 35):
      return BmiCategory.OBESE_MILD
    case (bmi < 40):
      return BmiCategory.OBESE_MODERATE
    default:
      return BmiCategory.OBESE_SEVERE
  }
}

const calculateBmi = (heightInCm: number, weightInKg: number): BmiCategory => {
  const bmi = weightInKg / Math.pow(0.01 * heightInCm, 2)
  return toBmiCategory(bmi)
}

console.log(calculateBmi(180, 74))
