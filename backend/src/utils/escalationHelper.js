export const shouldEscalate = ({ confidence, isAngry, intent }) => {
  return confidence < 0.3 || isAngry || intent === 'unknown';
};