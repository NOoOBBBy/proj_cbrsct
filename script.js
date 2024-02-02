document.addEventListener("DOMContentLoaded", function () {
  fetchSunriseAndSunset();
  setInterval(fetchSunriseAndSunset, 1000);
});

async function fetchSunriseAndSunset() {
  try {
    const now = new Date();
    const todaySunrise = await getSunrise(now);
    const todaySunset = await getSunset(now);
    const tomorrowSunrise = await getSunrise(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    const tomorrowSunset = await getSunset(new Date(now.getTime() + 24 * 60 * 60 * 1000));

    document.getElementById("sunriseTimer").innerText = formatTimeDifference(now, todaySunrise);
    document.getElementById("sunsetTimer").innerText = formatTimeDifference(now, todaySunset);
    document.getElementById("currentTime").innerText = `Current Time: ${now.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })}`;
    document.getElementById("todaySunsetTime").innerText = `Today's Sunset Time: ${formatAdjustedTime(todaySunset)}`;
    document.getElementById("tomorrowSunsetTime").innerText = `Tomorrow's Sunset Time: ${formatAdjustedTime(tomorrowSunset)}`;
  } catch (error) {
    console.error('Error fetching sunrise and sunset times:', error);
  }
}

async function getSunrise(date) {
  try {
    const formattedDate = formatDate(date);
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0&date=${formattedDate}&timezone=America/Chicago`);
    const data = await response.json();
    console.log('Sunrise API Response:', data);
    if (data.status === 'OK') {
      return new Date(data.results.sunrise);
    } else {
      console.error('Invalid sunrise time:', data);
      return null; // Return null for an invalid time
    }
  } catch (error) {
    console.error('Error fetching sunrise time:', error);
    return null; // Return null in case of an error
  }
}

async function getSunset(date) {
  try {
    const formattedDate = formatDate(date);
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0&date=${formattedDate}&timezone=America/Chicago`);
    const data = await response.json();
    console.log('Sunset API Response:', data);
    if (data.status === 'OK') {
      return new Date(data.results.sunset);
    } else {
      console.error('Invalid sunset time:', data);
      return null; // Return null for an invalid time
    }
  } catch (error) {
    console.error('Error fetching sunset time:', error);
    return null; // Return null in case of an error
  }
}

function formatDate(date) {
  // Format date as YYYY-MM-DD for API request
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatAdjustedTime(time) {
  if (time === null) {
    return 'N/A';
  }

  // Adjust the time using the UTC offset provided by the API
  const utcOffset = time.getTimezoneOffset();
  const adjustedTime = new Date(time.getTime() - utcOffset * 60 * 1000);

  return adjustedTime.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
}

function formatTimeDifference(now, targetTime) {
  if (targetTime === null) {
    return "N/A";
  }

  let diff = targetTime - now;
  const isNegative = diff < 0;

  if (isNegative) {
    // If the time is negative, calculate the difference from the next day's targetTime
    const tomorrowTargetTime = new Date(targetTime.getTime() + 24 * 60 * 60 * 1000);
    diff = tomorrowTargetTime - now;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `${isNegative ? '-' : ''}${hours}h ${minutes}m ${seconds}s`;
}
 