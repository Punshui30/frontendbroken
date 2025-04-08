import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

interface FlowCanvas3DProps {
  animationMode?: 'orbit' | 'zoom' | 'none';
}

// Custom TextSprite class
class TextSprite {
  object: THREE.Object3D;

  constructor(options: any) {
    this.object = new THREE.Object3D();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = 256;
      canvas.height = 128;
      context.font = `${options.fontSize || 24}px ${options.fontFamily || 'Arial'}`;
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(options.text || '', canvas.width / 2, canvas.height / 2);
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(30, 15, 1);
      this.object.add(sprite);
    }
  }

  get position() {
    return this.object.position;
  }

  set position(value) {
    this.object.position.copy(value);
  }
}

function FlowCanvas3D({ animationMode = 'none' }: FlowCanvas3DProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>();
  const intervalRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const data = {
    nodes: [
      { id: 'Start', group: 1, label: 'Start' },
      { id: 'Process', group: 2, label: 'Process Data' },
      { id: 'End', group: 3, label: 'End' },
      { id: 'Validate', group: 2, label: 'Validate Input' },
      { id: 'Transform', group: 2, label: 'Transform Data' },
      { id: 'Error', group: 4, label: 'Error Handler' },
      { id: 'Log', group: 5, label: 'Logger' },
      { id: 'API', group: 3, label: 'API Gateway' },
      { id: 'Database', group: 6, label: 'Database' },
      { id: 'Cache', group: 6, label: 'Cache Layer' },
      { id: 'Auth', group: 7, label: 'Authentication' },
      { id: 'Format', group: 2, label: 'Format Output' },
      { id: 'Notify', group: 5, label: 'Notifications' }
    ],
    links: [
      { source: 'Start', target: 'Process', value: 5 },
      { source: 'Process', target: 'Validate', value: 3 },
      { source: 'Validate', target: 'Transform', value: 2 },
      { source: 'Transform', target: 'Format', value: 2 },
      { source: 'Format', target: 'End', value: 5 },
      { source: 'Validate', target: 'Error', value: 1 },
      { source: 'Process', target: 'Log', value: 1 },
      { source: 'Error', target: 'Log', value: 3 },
      { source: 'Process', target: 'API', value: 4 },
      { source: 'API', target: 'Auth', value: 2 },
      { source: 'Auth', target: 'Database', value: 3 },
      { source: 'Database', target: 'Cache', value: 2 },
      { source: 'Cache', target: 'Transform', value: 3 },
      { source: 'Transform', target: 'Notify', value: 1 },
      { source: 'Error', target: 'Notify', value: 2 }
    ]
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateDimensions();
    resizeObserverRef.current = new ResizeObserver(updateDimensions);
    resizeObserverRef.current.observe(containerRef.current!);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  const getGroupColor = (group: number): string => {
    const colors = ['#00FFD0', '#5D5DFF', '#FFD166', '#EF476F', '#06D6A0', '#118AB2', '#073B4C'];
    return colors[(group - 1) % colors.length];
  };

  const createNodeObject = (node: any) => {
    const group = node.group || 1;
    const geometry = new THREE.SphereGeometry(7, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: getGroupColor(group),
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);

    const glowGeometry = new THREE.SphereGeometry(9, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: getGroupColor(group),
      transparent: true,
      opacity: 0.1
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    mesh.add(glowMesh);

    if (node.label) {
      const textSprite = new TextSprite({ text: node.label, fontFamily: 'Arial', fontSize: 8 });
      textSprite.position.y = 12;
      mesh.add(textSprite.object);
    }

    return mesh;
  };

  const fitView = () => {
    if (!fgRef.current) return;
    const graph = fgRef.current;
    const viewDistance = Math.max(300, Math.min(containerSize.width, containerSize.height) * 0.8);
    graph.cameraPosition({ x: 0, y: 0, z: viewDistance }, { x: 0, y: 0, z: 0 }, 1500);
  };

  useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      fg.cameraPosition({ z: 400 }, { x: 0, y: 0, z: 0 }, 0);
      setTimeout(fitView, 500);
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (animationMode !== 'none' && fg) {
      if (animationMode === 'orbit') {
        let angle = 0;
        intervalRef.current = window.setInterval(() => {
          const distance = 400;
          const x = distance * Math.sin(angle);
          const z = distance * Math.cos(angle);
          fg.cameraPosition({ x, y: 50, z });
          angle += 0.01;
        }, 30);
      } else if (animationMode === 'zoom') {
        let distance = 400;
        let direction = -1;
        intervalRef.current = window.setInterval(() => {
          distance += direction * 2;
          if (distance < 150) direction = 1;
          if (distance > 450) direction = -1;
          fg.cameraPosition({ z: distance });
        }, 30);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animationMode]);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      setTimeout(fitView, 100);
    }
  }, [containerSize]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(13, 15, 26, 0.95)',
        position: 'relative'
      }}
    >
      {containerSize.width > 0 && containerSize.height > 0 && (
        <ForceGraph3D
          ref={fgRef}
          width={containerSize.width}
          height={containerSize.height}
          graphData={data}
          nodeAutoColorBy="group"
          linkOpacity={0.5}
          linkWidth={(link) => (link.value || 1) * 0.5}
          backgroundColor="rgba(0,0,0,0)"
          nodeLabel={(node) => `${node.label || node.id} (Group: ${node.group})`}
          linkColor={() => 'rgba(0, 255, 208, 0.5)'}
          nodeColor={(node) => getGroupColor(node.group || 1)}
          nodeRelSize={6}
          linkDirectionalParticles={(link) => link.value || 1}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleWidth={(link) => (link.value || 1) * 0.5 + 0.5}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          d3AlphaDecay={0.02}
          cooldownTime={1500}
          nodeThreeObject={createNodeObject}
          nodeThreeObjectExtend={false}
          enableNodeDrag={true}
          enableNavigationControls={true}
          controlType="orbit"
          onEngineStop={fitView}
        />
      )}
    </div>
  );
}

export default FlowCanvas3D;

