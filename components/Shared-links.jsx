"use client";

import {
  TwitterShareButton,
  ViberShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

export default function SharedLinks({ link }) {
  return (
    <div>
      <TwitterShareButton url={link} title="X">
        <button>X</button>
      </TwitterShareButton>
      <ViberShareButton url={link}>
        <button>X</button>
      </ViberShareButton>
      <TelegramShareButton url={link}>
        <button>X</button>
      </TelegramShareButton>
      <WhatsappShareButton url={link}>
        <button>X</button>
      </WhatsappShareButton>
    </div>
  );
}
