export function predictRisk({ temperature, humidity, windSpeed, vegetation }) {
    let score = 0;
  
    if (temperature > 35) score += 30;
    if (humidity < 30) score += 20;
    if (windSpeed > 15) score += 30;
    if (vegetation > 70) score += 20;
  
    const percentage = Math.min(score, 100);
  
    let level = 'Low';
    if (percentage > 70) level = 'High';
    else if (percentage > 40) level = 'Medium';
  
    return { percentage, level };
  }
  