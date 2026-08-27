// app/resetpassword/[otp]/page.jsx
import ResetPasswordForm from "@/app/components/ResetPasswordForm";
import React from "react";

export default async function ResetPasswordPage({ params }) {
  const { otp } = await  params; // Next.js app router passes route params here
  return <ResetPasswordForm otpFromUrl={otp} />;
}
