import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { useThree, useFrame } from "react-three-fiber";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

const CameraShake = /*#__PURE__*/ forwardRef(
    (
        {
            intensity = 1,
            decay,
            decayRate = 0.65,
            maxYaw = 0.1,
            maxPitch = 0.1,
            maxRoll = 0.1,
            rollFrequency = 1,
            frequencyFactor = { current: 0.1 },
            additive,
        },
        ref
    ) => {
        const { camera } = useThree();
        const intensityRef = useRef(intensity);
        const [yawNoise] = useState(() => new SimplexNoise());
        const [pitchNoise] = useState(() => new SimplexNoise());
        const [rollNoise] = useState(() => new SimplexNoise());

        const constrainIntensity = () => {
            if (intensityRef.current < 0 || intensityRef.current > 1) {
                intensityRef.current = intensityRef.current < 0 ? 0 : 1;
            }
        };

        useImperativeHandle(
            ref,
            () => ({
                getIntensity: () => intensityRef.current,
                setIntensity: (val) => {
                    intensityRef.current = val;
                    constrainIntensity();
                },
            }),
            []
        );
        useFrame(({ clock }, delta) => {
            const shake = Math.pow(intensityRef.current, 2);
            const yaw =
                maxYaw *
                shake *
                yawNoise.noise(clock.elapsedTime * frequencyFactor.current, 1);
            const pitch =
                maxPitch *
                shake *
                pitchNoise.noise(
                    clock.elapsedTime * frequencyFactor.current,
                    1
                );
            const roll =
                maxRoll *
                shake *
                rollNoise.noise(clock.elapsedTime * rollFrequency, 1);

            if (additive) {
                camera.rotation.x += pitch;
                camera.rotation.y += yaw;
                camera.rotation.z += roll;
            } else {
                camera.rotation.set(pitch, yaw, roll);
            }

            if (decay && intensityRef.current > 0) {
                intensityRef.current -= decayRate * delta;
                constrainIntensity();
            }
        });
        return null;
    }
);

export { CameraShake };
