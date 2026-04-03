import { alpha } from '@mui/material/styles'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import PageFrame from '../components/layout/PageFrame'
import SplitText from '../components/split_text/SplitText'
import TiltedCard from '../components/tilted_card/TiltedCard'
import { useI18n } from '../i18n/useI18n'

const skills = ['JavaScript', 'TypeScript', 'React', 'PHP', 'Laravel', 'C#', '.NET', 'Java','SQL', 'Git']

function About() {
  const { t } = useI18n()
  const theme = useTheme()

  return (
    <PageFrame>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          alignSelf: 'stretch',
          px: { xs: 3, md: 5, lg: 6 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 16, md: 18 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1320, ml: 0, mr: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' },
              gap: { xs: 3, md: 4, lg: 5 },
              alignItems: 'start',
            }}
          >
            <Stack spacing={2.25}>
              <Typography
                component="p"
                sx={{
                  color: 'rgba(244, 245, 250, 0.78)',
                  fontFamily: 'var(--mono)',
                  fontSize: { xs: 12, md: 13 },
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0,0,0,0.42)',
                }}
              >
                {t.about.eyebrow}
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  color: '#f5f7ff',
                  fontSize: { xs: 'clamp(2.6rem, 10vw, 4.4rem)', md: 'clamp(3.4rem, 7vw, 5.4rem)' },
                  textShadow:
                    '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                  '& .split-page-title': {
                    margin: 0,
                    color: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.06em',
                  },
                }}
              >
                <SplitText
                  text={t.about.title}
                  tag="h1"
                  textAlign="left"
                  display="block"
                  splitType="words"
                  delay={100}
                  className="split-page-title"
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 700,
                  color: 'rgba(232, 234, 242, 0.9)',
                  fontSize: { xs: '1rem', md: '1.08rem' },
                  lineHeight: 1.85,
                  textShadow: '0 2px 14px rgba(0,0,0,0.48)',
                }}
              >
                {t.about.description}
              </Typography>
            </Stack>

            <Stack spacing={2.5}>
              <TiltedCard minHeight={220} rotateAmplitude={7} scaleOnHover={1.012}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.62)})`,
                    backdropFilter: 'blur(14px)',
                    transition: 'border-color 180ms ease, box-shadow 180ms ease',
                    '@media (hover: hover)': {
                      '&:hover': {
                        borderColor: alpha(theme.palette.primary.main, 0.42),
                        boxShadow: `0 16px 30px ${alpha(theme.palette.background.default, 0.24)}`,
                      },
                    },
                  }}
                >
                  <Stack spacing={2.25}>
                    <Typography variant="h5" sx={{ color: 'text.primary' }}>
                      {t.about.productTitle}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {t.about.productDescription}
                    </Typography>
                  </Stack>
                </Box>
              </TiltedCard>

              <TiltedCard minHeight={240} rotateAmplitude={7} scaleOnHover={1.012}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.62)})`,
                    backdropFilter: 'blur(14px)',
                    transition: 'border-color 180ms ease, box-shadow 180ms ease',
                    '@media (hover: hover)': {
                      '&:hover': {
                        borderColor: alpha(theme.palette.primary.main, 0.42),
                        boxShadow: `0 16px 30px ${alpha(theme.palette.background.default, 0.24)}`,
                      },
                    },
                  }}
                >
                  <Stack spacing={2.25}>
                    <Typography variant="h5" sx={{ color: 'text.primary' }}>
                      {t.about.stackTitle}
                    </Typography>

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                                  sx={{
                                    color: 'primary.light',
                                    borderColor: alpha(theme.palette.primary.main, 0.28),
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                  }}
                          variant="outlined"
                        />
                      ))}
                    </Stack>

                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {t.about.stackDescription}
                    </Typography>
                  </Stack>
                </Box>
              </TiltedCard>
            </Stack>
          </Box>
        </Box>
      </Box>
    </PageFrame>
  )
}

export default About
