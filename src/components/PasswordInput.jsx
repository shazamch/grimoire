import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordInput({ label, value, onChange, placeholder = "Password", ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      <div className="relative w-full">
        {/* Lock icon inside input */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Lock size={18} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-background border rounded px-10 py-2 border-gray-300 pr-10 hover:border-gray-400 focus:outline-none focus:ring focus:border-primary"
          {...props}
        />
        {/* Eye toggle */}
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
