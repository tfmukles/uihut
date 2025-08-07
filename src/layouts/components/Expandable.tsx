"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Expandable = ({ title, content }: { title: string; content: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`accordion`}>
      <button
        className={`accordion-header max-sm:text-base`}
        onClick={() => setShow(!show)}
      >
        <motion.svg
          className="accordion-icon"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          animate={show ? "open" : "collapsed"}
          variants={{
            open: { rotate: 0 },
            collapsed: { rotate: -90 },
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <path
            fill="currentColor"
            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
          ></path>
        </motion.svg>

        {title}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
              type: "tween",
            }}
          >
            <div
              className="accordion-content"
              dangerouslySetInnerHTML={markdownify(content)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Expandable;
