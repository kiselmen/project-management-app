import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  HeadingWrapper,
  Heading1,
  Heading3,
  Paragraph,
  Shadow,
  Btns,
  Ghost,
  GhostCopy,
  GhostContainer,
  One,
  Two,
  Three,
  Four,
  Bottom,
  Mouth,
  Eye,
  EyeRight,
  Face,
  btnHover,
} from './NotFoundContent.styles';

export const NotFoundContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeadingWrapper>
        <Heading1>404</Heading1>
        <Heading3>{t('page not found')}</Heading3>
      </HeadingWrapper>
      <GhostContainer>
        <GhostCopy>
          <One />
          <Two />
          <Three />
          <Four />
        </GhostCopy>
        <Ghost>
          <Face>
            <Eye />
            <EyeRight />
            <Mouth />
          </Face>
        </Ghost>
        <Shadow />
      </GhostContainer>
      <Bottom>
        <Paragraph>{t('Boo, looks like a ghost stole this page!')}</Paragraph>
        <Btns>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button sx={btnHover}>{t('BACK')}</Button>
          </Link>
        </Btns>
      </Bottom>
    </>
  );
};
