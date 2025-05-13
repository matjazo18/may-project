import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function NameField() {
  return (
    <div>
      <label htmlFor="name">Your Name</label>
      <input id="name" type="text" placeholder="Enter your name" />
    </div>
  );
}
