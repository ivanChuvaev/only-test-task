import ColorBox from '@/shared/ui/ColorBox';
import Container from '@/shared/ui/Container';
import TimeBlock from '@/widgets/TimeBlock';

export default function Home() {
  return (
    <div>
      <Container>
        <ColorBox />
      </Container>

      <Container>
        <TimeBlock />
      </Container>

      <Container>
        <ColorBox />
      </Container>
    </div>
  );
}
