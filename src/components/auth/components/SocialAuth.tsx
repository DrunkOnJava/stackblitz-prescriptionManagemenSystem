import React from 'react';
import AuthButton from './AuthButton';

interface SocialAuthProps {
  onGoogleClick: () => void;
  isLoading: boolean;
}

export default function SocialAuth({ onGoogleClick, isLoading }: SocialAuthProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
        </div>
      </div>

      <AuthButton
        type="button"
        variant="secondary"
        onClick={onGoogleClick}
        isLoading={isLoading}
        loadingText="Signing in..."
      >
        <img
          className="h-5 w-5 mr-2"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
        />
        Sign in with Google
      </AuthButton>
    </div>
  );
}