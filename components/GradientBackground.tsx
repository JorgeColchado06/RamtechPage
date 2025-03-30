export default function GradientBackground() {
    return (
      <div
        className="fixed inset-0 w-full h-screen -z-10"
        style={{
          background: "radial-gradient(circle at center, #0a1a1a, #000000)",
        }}
      />
    )
  }
  