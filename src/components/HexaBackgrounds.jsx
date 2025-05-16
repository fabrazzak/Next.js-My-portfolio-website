'use client'
import { useCallback } from 'react'
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"

export default function HexaBackgrounds() {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to initialize particles:", error)
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden z-50">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        className="pointer-events-none w-full h-full fixed inset-0 -z-10"
        init={particlesInit}
        options={{
          fullScreen: false,
          fpsLimit: 60,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#06b6d4"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              random: true,
            },
            size: {
              value: { min: 1, max: 2 },
              random: true
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out"
              }
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              },
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.2
                }
              },
            }
          },
          detectRetina: true
        }}
      />
    </div>
  )
}