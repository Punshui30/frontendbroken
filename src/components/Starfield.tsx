import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function Starfield() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100}
          depth={50}
          count={800}
          factor={5}
          saturation={0}
          fade
          speed={0.25}
        />
      </Canvas>
    </div>
  );
}
