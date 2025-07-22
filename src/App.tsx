import Container from './shared/ui/Container'
import ColorBox from './widgets/ColorBox'
import TimeBlock from './widgets/TimeBlock'

export default function App() {
  return (
    <>
      <Container style={{ background: '#F4F5F9' }}>
        <TimeBlock />
      </Container>

      <Container>
        <ColorBox color="#EF5DA8" title="COLOR BOX DIVIDER" />
      </Container>

      <Container style={{ background: '#F4F5F9' }}>
        <TimeBlock />
      </Container>
    </>
  )
}
