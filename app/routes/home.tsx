import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

import { Input, Wrapper } from "dados-saude";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [value, setValue] = useState("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log("Email mudou:", email);
  }, [email]);

  useEffect(() => {
    console.log("Password mudou:", password);
  }, [password]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Wrapper>
        {" "}
        <p>value: {value}</p>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Email: {email}</p>
        </div>
      </Wrapper>
    </div>
  );
}
