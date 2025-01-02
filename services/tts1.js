/* eslint-disable no-unused-vars */
const audioDict = {
  welcome:
    "Hello, I'm Maria, your smart assistant. Would you like to check in or check out?",
  enter_booking: "To get started, please enter your booking reference number.",
  scan_id:
    "Please scan your identification document, select a passport or emirates id to continue",
  id_verified:
    "Thank you {name}! Your identity has been verified. We have your reservation details for {dates}, {room_type}. Is everything correct?",
  welcome_guest:
    "It's a pleasure to welcome you, We're confirming your booking for {dates}, {room_type}.",
  reservation_verified:
    "Your reservation and identification have been successfully verified!",
  discrepancy:
    "It seems there is a discrepancy in the information provided. Would you like to speak to our customer service for assistance?",
  payment_request:
    "Next, please insert or tap your credit card for payment and incidentals.",
  pre_auth:
    "We will pre-authorize your card for the estimated amount of your stay. Is that okay?",
  upsell:
    "We have some special options to make your stay even better! Would you be interested in upgrading your room to a deluxe suite with complimentary breakfast and extra amenities for a discounted rate? You can pay with credit or use loyalty points.",
  room_assignment: "Assigning your room now. Please hold on for just a moment.",
  room_key: "Your room number is {room_number}. Here is your room key.",
  hotel_info:
    "Here is some information about our hotel amenities and services. Breakfast is served from 8 AM to 11:30 AM. Wi-Fi access details are SSID : hotel , Password : hotel1234.",
  luggage_assist: "Do you need assistance with your luggage?",
  late_checkout:
    "We noted that you prefer a late check-out. Would you like to confirm this for an additional fee or using loyalty points?",
  check_in_start:
    "Let's begin the check-in process. Please enter your booking reference number.",
  check_out_start:
    "Let's begin the check-out process. Please confirm your room number.",
  scanning_information:
    "We're currently scanning your information, please wait.",
  additional_requests:
    "We are here to make your stay as comfortable as possible. If you have any special requests, such as extra pillows, dinner reservations, or other services, please let us know.",
  return_keys:
    "Please return your room keys by inserting them into the slot below.",
  feedback_request:
    "We hope you enjoyed your stay. Could you please provide feedback",
  review_bill: "Please review your bill for any outstanding charges.",
  payment_success: "Thank you! Here is your receipt for the stay.",
  found_information:
    "We have successfully scanned your information! Please confirm.",
};

export async function preloadAudio(audioKeys) {
  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2";

  for (const key of audioKeys) {
    const cacheKey = `${key}`;
    const cachedAudio = localStorage.getItem(cacheKey);

    if (!cachedAudio) {
      const formattedText = formatText(audioDict[key]);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": "16a3944b0a4f0c654668c16d72b396d7",
          },
          body: JSON.stringify({
            text: formattedText,
          }),
        });

        if (!response.ok) {
          console.error(`Failed to fetch audio for key: ${key}`);
          continue;
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        localStorage.setItem(cacheKey, audioUrl);
      } catch (error) {
        console.error(`Error preloading audio for key: ${key}`, error);
      }
    }
  }
}

let currentAudio = null;

export async function textToSpeech(key, params) {
  const formattedText = formatText(audioDict[key], params);
  const cacheKey = `${key}`;
  const cachedAudio = localStorage.getItem(cacheKey);

  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": "16a3944b0a4f0c654668c16d72b396d7",
    },
    body: JSON.stringify({
      text: formattedText,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to generate audio");
  }

  const audioBlob = await response.blob();

  const audioUrl = URL.createObjectURL(audioBlob);
  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(audioUrl);
  currentAudio.play();
}

export function playAudio(key, params) {
    const cacheKey = `${key}`;
    const cachedAudio = localStorage.getItem(cacheKey);
  
    if (cachedAudio) {
      if (currentAudio) {
        currentAudio.pause();
      }
      currentAudio = new Audio(cachedAudio);
      currentAudio.play();
    } else {
      textToSpeech(key, params);
    }
  }
  

export function formatText(text, params) {
  return text.replace(/\{([^}]+)\}/g, (match, p1) => params[p1] || match);
}
