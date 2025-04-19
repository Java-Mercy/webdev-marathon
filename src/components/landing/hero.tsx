"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

export default function LandingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create floating books/education objects
    const createFloatingObject = (geometry: THREE.BufferGeometry, color: string, x: number, y: number, z: number) => {
      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.1,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, y, z)
      scene.add(mesh)
      return mesh
    }

    // Create book geometries
    const bookGeometry = new THREE.BoxGeometry(1, 1.5, 0.2)
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100)

    // Create objects
    const objects = [
      createFloatingObject(bookGeometry, "#4c6ef5", -2, 0, 0),
      createFloatingObject(sphereGeometry, "#15aabf", 0, 1, -2),
      createFloatingObject(torusGeometry, "#7950f2", 2, -1, -1),
      createFloatingObject(bookGeometry, "#fa5252", 1, 2, -3),
      createFloatingObject(sphereGeometry, "#82c91e", -1, -2, -2),
    ]

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation
    objects.forEach((obj, i) => {
      gsap.to(obj.rotation, {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
        duration: 20 + i * 2,
        ease: "none",
        repeat: -1,
      })

      gsap.to(obj.position, {
        y: obj.position.y + 0.5,
        duration: 2 + i * 0.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })
    })

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Learn Without <span className="text-primary">Limits</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-md">
              An AI-powered education platform that transforms how students learn and teachers teach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Courses
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join over <span className="font-medium">10,000+</span> students
              </p>
            </div>
          </div>
          <div ref={containerRef} className="relative h-[300px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#4c6ef5_100%)]" />
    </section>
  )
}
