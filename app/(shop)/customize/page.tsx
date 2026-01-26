import Header from "@/components/Header"
import FrameConfigurator from "@/components/FrameConfigurator"
import TrustSignalStrip from "@/components/TrustSignalStrip"
import Footer from "@/components/Footer"

export default function CustomizePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <TrustSignalStrip />
      <FrameConfigurator />
      <Footer />
    </main>
  )
}
