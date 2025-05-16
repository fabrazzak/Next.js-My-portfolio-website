'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { loadSlim } from "tsparticles-slim"
import Particles from "react-tsparticles"
import {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaWordpress,
  FaBootstrap
} from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiRedux, SiTailwindcss, SiNextdotjs,
  SiFirebase, SiAntdesign, SiShadcnui, SiFramer, SiGreensock
} from 'react-icons/si';

export default function InteractiveSkillBackground() {
  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine)
    } catch (error) {
      console.error("Failed to initialize particles:", error)
    }
  }, [])

  const skills = [
    { name: 'React', icon: <FaReact size={24} />, color: 'bg-blue-500/20', percentage: 90 },
    { name: 'JavaScript', icon: <FaJs size={24} />, color: 'bg-yellow-500/20', percentage: 95 },
    { name: 'TypeScript', icon: <SiTypescript size={24} />, color: 'bg-blue-600/20', percentage: 85 },
    { name: 'HTML', icon: <FaHtml5 size={24} />, color: 'bg-orange-500/20', percentage: 98 },
    { name: 'CSS', icon: <FaCss3Alt size={24} />, color: 'bg-blue-400/20', percentage: 92 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} />, color: 'bg-teal-400/20', percentage: 90 },
    { name: 'ShadCN', icon: <SiShadcnui size={24} />, color: 'bg-purple-400/20', percentage: 80 },
    { name: 'Ant Design', icon: <SiAntdesign size={24} />, color: 'bg-red-500/20', percentage: 75 },
    { name: 'Bootstrap', icon: <FaBootstrap size={24} />, color: 'bg-indigo-500/20', percentage: 85 },
    { name: 'Redux', icon: <SiRedux size={24} />, color: 'bg-purple-600/20', percentage: 88 },
    { name: 'Next.js', icon: <SiNextdotjs size={24} />, color: 'bg-black/20', percentage: 87 },
    { name: 'Node.js', icon: <FaNodeJs size={24} />, color: 'bg-green-500/20', percentage: 88 },
    { name: 'Git', icon: <FaGitAlt size={24} />, color: 'bg-orange-600/20', percentage: 85 },
    { name: 'MongoDB', icon: <SiMongodb size={24} />, color: 'bg-green-400/20', percentage: 78 },
    { name: 'WordPress', icon: <FaWordpress size={24} />, color: 'bg-blue-900/20', percentage: 95 },
    { name: 'Firebase', icon: <SiFirebase size={24} />, color: 'bg-yellow-400/20', percentage: 80 }, 
    { name: 'NextAuth', icon: <FaLock size={24} />, color: 'bg-gray-500/20', percentage: 70 },
    { name: 'Framer Motion', icon: <SiFramer size={24} />, color: 'bg-pink-400/20', percentage: 75 },
    { name: 'GSAP', icon: <SiGreensock size={24} />, color: 'bg-green-600/20', percentage: 70 },
  ];

  const containerRef = useRef(null);
  const iconsRef = useRef([]);
  const [activeIcon, setActiveIcon] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const animationRef = useRef(null);
  
  // Initialize positions with different movement patterns
  const positionsRef = useRef(skills.map((_, i) => {
    const angle = (i / skills.length) * Math.PI * 2;
    const distance = 60 + Math.random() * 100;
    
    // Random movement pattern for each icon
    const movementPattern = Math.floor(Math.random() * 5);
    let vx, vy;
    
    switch(movementPattern) {
      case 0: // Horizontal movement
        vx = (Math.random() * 0.3 - 0.15) * 2;
        vy = 0;
        break;
      case 1: // Vertical movement
        vx = 0;
        vy = (Math.random() * 0.3 - 0.15) * 2;
        break;
      case 2: // Diagonal movement
        vx = (Math.random() * 0.2 - 0.1) * 2;
        vy = (Math.random() * 0.2 - 0.1) * 2;
        break;
      case 3: // Circular movement
        vx = Math.cos(angle) * 0.15;
        vy = Math.sin(angle) * 0.15;
        break;
      default: // Random movement
        vx = Math.random() * 0.3 - 0.15;
        vy = Math.random() * 0.3 - 0.15;
    }
    
    return {
      x: 50 + Math.cos(angle) * distance,
      y: 50 + Math.sin(angle) * distance,
      vx: vx,
      vy: vy,
      angle: 0,
      isDragging: false,
      size: 40,
      baseSpeed: 1,
      speedMultiplier: 1,
      movementPattern: movementPattern, // Store the pattern for later reference
      patternCounter: 0, // Counter to track pattern changes
      changeInterval: 200 + Math.random() * 300 // When to change direction
    }
  }));

  // Check for collisions between two icons
  const checkCollision = (icon1, icon2) => {
    const dx = icon1.x - icon2.x;
    const dy = icon1.y - icon2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (icon1.size + icon2.size) / 2;
  };

  // Handle collision between two icons
  const handleCollision = (icon1, icon2) => {
    const dx = icon2.x - icon1.x;
    const dy = icon2.y - icon1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return;
    
    const nx = dx / distance;
    const ny = dy / distance;
    const relativeVelocityX = icon2.vx - icon1.vx;
    const relativeVelocityY = icon2.vy - icon1.vy;
    const impulse = (relativeVelocityX * nx + relativeVelocityY * ny) * 1.5;
    
    if (!icon1.isDragging) {
      icon1.vx += impulse * nx * 0.5;
      icon1.vy += impulse * ny * 0.5;
    }
    
    if (!icon2.isDragging) {
      icon2.vx -= impulse * nx * 0.5;
      icon2.vy -= impulse * ny * 0.5;
    }
  };

  // Change movement pattern occasionally
  const updateMovementPattern = (pos) => {
    pos.patternCounter++;
    
    if (pos.patternCounter >= pos.changeInterval) {
      pos.patternCounter = 0;
      pos.changeInterval = 200 + Math.random() * 300;
      
      // Only change pattern if not being dragged
      if (!pos.isDragging) {
        switch(pos.movementPattern) {
          case 0: // Horizontal to vertical
            pos.vx = 0;
            pos.vy = (Math.random() * 0.3 - 0.15) * 2;
            pos.movementPattern = 1;
            break;
          case 1: // Vertical to diagonal
            pos.vx = (Math.random() * 0.2 - 0.1) * 2;
            pos.vy = (Math.random() * 0.2 - 0.1) * 2;
            pos.movementPattern = 2;
            break;
          case 2: // Diagonal to circular
            const angle = Math.atan2(pos.y - 50, pos.x - 50);
            pos.vx = Math.cos(angle) * 0.15;
            pos.vy = Math.sin(angle) * 0.15;
            pos.movementPattern = 3;
            break;
          case 3: // Circular to random
            pos.vx = Math.random() * 0.3 - 0.15;
            pos.vy = Math.random() * 0.3 - 0.15;
            pos.movementPattern = 4;
            break;
          default: // Random to horizontal
            pos.vx = (Math.random() * 0.3 - 0.15) * 2;
            pos.vy = 0;
            pos.movementPattern = 0;
        }
      }
    }
  };

  // Animation loop with collision detection
  const animate = () => {
    const positions = positionsRef.current;
    
    positions.forEach((pos, index) => {
      if (pos.isDragging) return;
      
      // Update movement pattern occasionally
      updateMovementPattern(pos);
      
      // Apply speed multiplier (3x if selected)
      const speedMultiplier = selectedIcon === index ? 3 : 1;
      
      // Update position with velocity
      pos.x += pos.vx * speedMultiplier;
      pos.y += pos.vy * speedMultiplier;
      pos.angle += 0.5 * speedMultiplier;
      
      // Bounce off edges with more force
      if (pos.x < 5) {
        pos.x = 5;
        pos.vx = Math.abs(pos.vx) * (0.5 + Math.random() * 0.5);
      } else if (pos.x > 95) {
        pos.x = 95;
        pos.vx = -Math.abs(pos.vx) * (0.5 + Math.random() * 0.5);
      }
      
      if (pos.y < 5) {
        pos.y = 5;
        pos.vy = Math.abs(pos.vy) * (0.5 + Math.random() * 0.5);
      } else if (pos.y > 95) {
        pos.y = 95;
        pos.vy = -Math.abs(pos.vy) * (0.5 + Math.random() * 0.5);
      }
      
      // Apply centripetal force to prevent clustering in center
      const centerX = 50;
      const centerY = 50;
      const dx = pos.x - centerX;
      const dy = pos.y - centerY;
      const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
      
      if (distanceToCenter < 20) {
        const force = (20 - distanceToCenter) * 0.005;
        pos.vx += dx / distanceToCenter * force;
        pos.vy += dy / distanceToCenter * force;
      }
      
      // Apply to DOM
      if (iconsRef.current[index]) {
        iconsRef.current[index].style.left = `${pos.x}%`;
        iconsRef.current[index].style.top = `${pos.y}%`;
        iconsRef.current[index].style.transform = `rotate(${Math.sin(pos.angle * Math.PI / 180) * 8}deg)`;
      }
    });
    
    // Check for collisions between all pairs of icons
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (checkCollision(positions[i], positions[j])) {
          handleCollision(positions[i], positions[j]);
        }
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!containerRef.current || activeIcon === null) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    positionsRef.current[activeIcon] = {
      ...positionsRef.current[activeIcon],
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
      isDragging: true
    };
    
    if (iconsRef.current[activeIcon]) {
      iconsRef.current[activeIcon].style.left = `${positionsRef.current[activeIcon].x}%`;
      iconsRef.current[activeIcon].style.top = `${positionsRef.current[activeIcon].y}%`;
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (activeIcon !== null) {
      // When releasing, give it a random velocity
      positionsRef.current[activeIcon] = {
        ...positionsRef.current[activeIcon],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        isDragging: false,
        movementPattern: 4, // Set to random pattern after dragging
        patternCounter: 0
      };
      setActiveIcon(null);
    }
  };

  // Handle icon click
  const handleIconClick = (index, e) => {
    e.stopPropagation();
    setSelectedIcon(selectedIcon === index ? null : index);
  };

  // Handle click outside icons
  const handleContainerClick = () => {
    setSelectedIcon(null);
  };

  // Set up event listeners and animation
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, [activeIcon, selectedIcon]);

  return (
    <div className="relative w-full h-full overflow-hidden z-50" onClick={handleContainerClick}>
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
      
      {/* Animated Skill Icons */}
      <div 
        ref={containerRef}
        className="absolute inset-0"
      >
        {skills.map((skill, index) => (
          <div 
            key={index}
            ref={el => iconsRef.current[index] = el}
            className={`
              absolute w-10 h-10 rounded-full 
              ${skill.color} backdrop-blur-sm 
              border border-white/20 flex items-center justify-center 
              text-2xl transition-all duration-300 ease-in-out
              hover:scale-125 hover:shadow-lg hover:shadow-white/20
              cursor-move group
              ${activeIcon === index ? 'scale-125 z-10 shadow-lg shadow-white/20' : ''}
              ${selectedIcon === index ? '!scale-150 !shadow-xl !shadow-white/30' : ''}
              will-change-transform
            `}
            style={{
              left: `${positionsRef.current[index].x}%`,
              top: `${positionsRef.current[index].y}%`,
              transform: `rotate(${Math.sin(positionsRef.current[index].angle * Math.PI / 180) * 8}deg)`,
              transition: activeIcon === index ? 'none' : 'all 0.3s ease'
            }}
            onMouseDown={() => setActiveIcon(index)}
            onClick={(e) => handleIconClick(index, e)}
          >
            <div className="text-white flex items-center justify-center">
              {skill.icon}
            </div>
            
            {/* Skill percentage display */}
            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 
              ${selectedIcon === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
              transition-opacity duration-300 w-full text-center pointer-events-none`}>
              <div className="text-xs font-medium text-white mb-1 whitespace-nowrap">
                {skill.name}
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                <div 
                  className="bg-cyan-400 h-1.5 rounded-full" 
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-cyan-400 font-bold mt-1">
                {skill.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}