import { Box, Chip, Stack, Typography } from '@mui/material'
import PageFrame from '../components/layout/PageFrame'
import { useI18n } from '../i18n/useI18n'

const skills = ['React', 'TypeScript', 'UI Design', 'Motion', 'WebGL', 'Design Systems']

function About() {
  const { t } = useI18n()

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

              <Typography
                variant="h1"
                sx={{
                  color: '#f5f7ff',
                  fontSize: { xs: 'clamp(2.6rem, 10vw, 4.4rem)', md: 'clamp(3.4rem, 7vw, 5.4rem)' },
                  textShadow:
                    '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                }}
              >
                {t.about.title}
              </Typography>

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
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 5,
                  background:
                    'linear-gradient(180deg, rgba(17, 21, 36, 0.82), rgba(10, 12, 20, 0.62))',
                  backdropFilter: 'blur(14px)',
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

              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 5,
                  background:
                    'linear-gradient(180deg, rgba(17, 21, 36, 0.82), rgba(10, 12, 20, 0.62))',
                  backdropFilter: 'blur(14px)',
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
                          borderColor: 'rgba(111,124,255,0.28)',
                          backgroundColor: 'rgba(111,124,255,0.08)',
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
            </Stack>
          </Box>
        </Box>
      </Box>
    </PageFrame>
  )
}

export default About
