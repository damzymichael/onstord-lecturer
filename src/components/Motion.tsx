import {motion} from 'framer-motion';

export const container = {
  hidden: {opacity: 1, scale: 0},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export const item = {
  hidden: {y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1
  }
};

export const MotionContainer = (
  props: React.HTMLAttributes<HTMLDivElement>
) => {
  return (
    <motion.div
      className={'container ' + props.className}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {props.children}
    </motion.div>
  );
};
