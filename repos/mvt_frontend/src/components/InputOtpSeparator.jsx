import React, { useState, useEffect } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";

export function InputOTPWithSeparator({ id, setOtp, isOtpValid }) {
  const [otp, setOtpValue] = useState("");

  const handleOtpChange = (newOtp) => {
    setOtpValue(newOtp);
    console.log(`Updated OTP: ${newOtp}`); // Log the updated OTP
  };

  useEffect(() => {
    if (otp.length === 6) {
      console.log(`Validating OTP: ${otp}`); // Log OTP before validation
      setOtp(otp);
    }
  }, [otp, setOtp]);

  return (
    <div>
      <InputOTP
          id={id}
          maxLength={6} 
          value={otp} 
          onChange={handleOtpChange} 
          disabled={isOtpValid} 
          // pattern={REGEXP_ONLY_DIGITS_AND_CHARS} 
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
