'use client';

import { useState } from 'react';

export default function SMSConsent() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="px-6 pb-6 pt-2 border-t border-slate-700 bg-slate-900/50">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id="sms-consent"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 w-4 h-4 flex-shrink-0 accent-blue-500 cursor-pointer"
        />
        <span className="text-slate-300 text-sm leading-relaxed">
          By checking this box, I consent to receive SMS text messages and/or calls from{' '}
          <strong className="text-white">MyVoIP</strong> at
          the phone number provided above. Message frequency may vary. Standard message and data
          rates may apply. Reply <strong>STOP</strong> to opt out at any time. Reply{' '}
          <strong>HELP</strong> for assistance. This consent is not required as a condition of
          purchase. See our{' '}
          <a
            href="https://my-voip.com/privacy-policy"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://my-voip.com/terms-of-services"
            className="text-blue-400 hover:text-blue-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          .
        </span>
      </label>

      {/* A2P 10DLC mandatory disclosures */}
      <div className="mt-4 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-xs text-slate-400 leading-relaxed space-y-1.5">
        <p>
          <strong className="text-slate-300">Message frequency:</strong> Up to 4 messages per
          month. Message and data rates may apply.
        </p>
        <p>
          <strong className="text-slate-300">To opt out:</strong> Reply{' '}
          <strong>STOP</strong> to any message. You will receive one confirmation, then no
          further messages.
        </p>
        <p>
          <strong className="text-slate-300">Need help?</strong> Reply <strong>HELP</strong>{' '}
          or contact{' '}
          <a href="mailto:Sales@my-voip.com" className="text-blue-400 hover:text-blue-300">
            Sales@my-voip.com
          </a>{' '}
          or call{' '}
          <a href="tel:+18336986471" className="text-blue-400 hover:text-blue-300">
            (833) 698-6471
          </a>
          .
        </p>
        <p>SMS consent is not required to use our services or make a purchase.</p>
      </div>
    </div>
  );
}
