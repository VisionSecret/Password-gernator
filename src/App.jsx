import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharacters, setSpecialCharacters] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) characters += "0123456789";
    if (specialCharacters) characters += "!@#$%^&*()_";

    for (let i = 1; i < passwordLength; i++) {
      let random = Math.floor(Math.random() * characters.length + 1);
      generatedPassword += characters.charAt(random);
    }

    setPassword(generatedPassword);
  }, [passwordLength, numberAllowed, specialCharacters, setPassword]);

  const passwordRef = useRef(null);

  const copToClipBoard = useCallback(() => {
    if (!passwordRef.current) return;
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,7);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [
    passwordGenerator,
    passwordLength,
    numberAllowed,
    specialCharacters,
    setPassword,
  ]);
  return (
    <>
      <div className="w-full h-screen bg-zinc-800 flex justify-center pt-32">
        <div className="content w-2/5 h-1/2 bg-slate-600 rounded-lg">
          <h1 className="font-bold font-mono text-3xl text-center mt-3 text-zinc-300">
            Your Password Genrator
          </h1>
          <div className="flex items-center gap-x-2 px-2 mt-5">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-2 py-2 rounded-l-md rounded-r-none outline-none border-none font-sans font-medium"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility()}
              className="text-sm bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded-md"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex items-center justify-between mx-5 mt-5">
            <div className="flex items-center gap-x-2">
              <input
                type="range"
                min={8}
                max={100}
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                className="w-28"
              />
              <label className="text-red-600 text-md font-sans font-semibold">
                Length: {passwordLength}
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="cursor-pointer"
              />
              <label className="text-md text-red-600 font-sans font-semibold">
                Numbers
              </label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                checked={specialCharacters}
                onChange={() => setSpecialCharacters((prev) => !prev)}
                className="cursor-pointer"
              />
              <label className="text-md text-red-600 font-sans font-semibold">
                Special Characters
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {showPassword && (
              <button
                onClick={() => copToClipBoard()}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-md"
              >
                Copy to ClipBoard
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
