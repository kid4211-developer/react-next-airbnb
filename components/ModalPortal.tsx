import React, { useEffect, useRef, useState } from "react";
import { Container } from "@styles/Modal.js";
import { createPortal } from "react-dom";

interface IProps {
  children: React.ReactNode;
}

const ModalPortal: React.FC<IProps> = ({ children }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector("#root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <Container>
        <div className="modal-background" role="presentation" />
        {children}
      </Container>,
      ref.current
    );
  }

  return null;
};

export default ModalPortal;
