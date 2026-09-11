import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  swayDuration: number;
}

export const FloatingPetals: React.FC = () => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 16,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 8,
      rotate: Math.random() * 360,
      swayDuration: 3 + Math.random() * 3,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-50px]"
          style={{ left: `${petal.left}%` }}
          animate={{
            y: ['0vh', '110vh'],
            x: ['0px', `${(petal.id % 2 === 0 ? 1 : -1) * (20 + (petal.id * 5) % 40)}px`],
            rotate: [petal.rotate, petal.rotate + 360],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: petal.delay,
            },
            x: {
              duration: petal.swayDuration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            rotate: {
              duration: petal.duration * 0.8,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.2}
            viewBox="0 0 30 36"
            fill="none"
            className="opacity-70 drop-shadow-sm"
          >
            <defs>
              <radialGradient id={`petal-grad-${petal.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#E8D5B5" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#B08968" stopOpacity="0.5" />
              </radialGradient>
            </defs>
            <path
              d="M15 0C22 8 30 18 28 27C26 33 19 36 15 36C11 36 4 33 2 27C0 18 8 8 15 0Z"
              fill={`url(#petal-grad-${petal.id})`}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
