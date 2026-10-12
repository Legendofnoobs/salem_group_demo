'use client';

export function getClientSessionId(): string {
  if (typeof window === 'undefined') return 'server-session';
  
  let sid = sessionStorage.getItem('salem_sid');
  if (!sid) {
    sid = 's_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
    sessionStorage.setItem('salem_sid', sid);
  }
  return sid;
}

export function detectTrafficSource(): string {
  if (typeof window === 'undefined') return 'Direct';

  const storedSource = sessionStorage.getItem('salem_source');
  if (storedSource) return storedSource;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || urlParams.get('source') || urlParams.get('ref');

  if (utmSource) {
    const formatted = utmSource.charAt(0).toUpperCase() + utmSource.slice(1).toLowerCase();
    sessionStorage.setItem('salem_source', formatted);
    return formatted;
  }

  const referrer = document.referrer.toLowerCase();
  let detected = 'Direct';

  if (referrer.includes('whatsapp') || referrer.includes('wa.me')) {
    detected = 'WhatsApp';
  } else if (referrer.includes('instagram.com')) {
    detected = 'Instagram';
  } else if (referrer.includes('tiktok.com')) {
    detected = 'TikTok';
  } else if (referrer.includes('facebook.com') || referrer.includes('fb.me')) {
    detected = 'Facebook';
  } else if (referrer.includes('google.')) {
    detected = 'Google';
  }

  sessionStorage.setItem('salem_source', detected);
  return detected;
}
