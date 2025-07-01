import React from 'react';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';

interface LogoProps {
  text?: string;
}

export const Logo: React.FC<LogoProps> = ({ text = 'CLI RACER' }) => {
  return (
    <Gradient name="rainbow">
      <BigText text={text} font="block" />
    </Gradient>
  );
};