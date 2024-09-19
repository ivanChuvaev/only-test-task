import ColorBox from '@/widgets/ColorBox';
import Container from '@/shared/ui/Container';
import TimeBlock from '@/widgets/TimeBlock';

export default function Home() {
  return (
    <div>
      <Container>
        <ColorBox color="#EF5DA8" title="COLOR BOX HEADER" />
      </Container>

      <Container style={{ background: '#F4F5F9' }}>
        <TimeBlock />
      </Container>

      <Container>
        <ColorBox color="#5D5FEF" title="COLOR BOX DIVIDER" />
      </Container>

      <Container style={{ background: '#F4F5F9' }}>
        <TimeBlock />
      </Container>

      <Container>
        <ColorBox color="#EF5DA8" title="COLOR BOX FOOTER" />
      </Container>
    </div>
  );
}
