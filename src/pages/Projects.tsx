import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@mui/material'
import TiltedCard from '../components/tilted_card/TiltedCard'
import PageFrame from '../components/layout/PageFrame'
import SplitText from '../components/split_text/SplitText'
import { useI18n } from '../i18n/useI18n'

type ProjectItem = {
  title: string
  description: string
  tags: string[]
}

const projects: ProjectItem[] = [
  {
    title: 'Landing Pages',
    description: 'landingPages',
    tags: ['PHP', 'JavaScript', 'React'],
  },
  {
    title: 'UI Experiments',
    description: 'uiExperiments',
    tags: ['JavaScript', 'React'],
  },
  {
    title: 'Design Systems',
    description: 'designSystems',
    tags: ['React', 'JavaScript'],
  },
  {
    title: 'Creative Portfolios',
    description: 'creativePortfoliosA',
    tags: ['PHP', 'Java'],
  },
  {
    title: 'Enterprise Dashboard',
    description: 'creativePortfoliosB',
    tags: ['Java', 'JavaScript'],
  },
]

const PROJECTS_PER_PAGE = 4
const stackFilters = ['PHP', 'Java', 'React', 'JavaScript'] as const

function chunkProjects<T>(items: T[], size: number) {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function Projects() {
  const { t } = useI18n()
  const theme = useTheme()
  const [selectedStack, setSelectedStack] = useState<string>('all')
  const filteredProjects = useMemo(() => {
    if (selectedStack === 'all') return projects

    return projects.filter((project) => project.tags.includes(selectedStack))
  }, [selectedStack])
  const projectPages = useMemo(
    () => chunkProjects(filteredProjects, PROJECTS_PER_PAGE),
    [filteredProjects],
  )
  const [activePage, setActivePage] = useState(0)

  const canGoPrev = activePage > 0
  const canGoNext = activePage < projectPages.length - 1

  useEffect(() => {
    setActivePage(0)
  }, [selectedStack])

  function goPrev() {
    if (canGoPrev) setActivePage((current) => current - 1)
  }

  function goNext() {
    if (canGoNext) setActivePage((current) => current + 1)
  }

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
        <Box sx={{ width: '100%', maxWidth: 'none', ml: 0, mr: 0 }}>
          <Box
            sx={{
              mb: 3.5,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Stack spacing={2} sx={{ maxWidth: 760, textAlign: 'left' }}>
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
                {t.projects.eyebrow}
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  pb: '0.14em',
                  color: '#f5f7ff',
                  fontSize: { xs: 'clamp(2.6rem, 10vw, 4.4rem)', md: 'clamp(3.6rem, 7vw, 5.6rem)' },
                  textShadow:
                    '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                  '& .split-page-title': {
                    margin: 0,
                    color: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 600,
                    lineHeight: 1.04,
                    letterSpacing: '-0.06em',
                  },
                }}
              >
                <SplitText
                  text={t.projects.title}
                  tag="h1"
                  textAlign="left"
                  display="block"
                  overflow="visible"
                  splitType="words"
                  delay={100}
                  className="split-page-title"
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 760,
                  color: 'rgba(232, 234, 242, 0.88)',
                  fontSize: { xs: '0.98rem', md: '1.05rem' },
                  textShadow: '0 2px 14px rgba(0,0,0,0.48)',
                }}
              >
                {t.projects.description}
              </Typography>

              <Stack spacing={1.25}>
                <Typography
                  component="p"
                  sx={{
                    color: 'rgba(244, 245, 250, 0.78)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t.projects.filterLabel}
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    label={t.projects.allStacks}
                    clickable
                    onClick={() => setSelectedStack('all')}
                    variant={selectedStack === 'all' ? 'filled' : 'outlined'}
                    sx={{
                      color:
                        selectedStack === 'all'
                          ? theme.palette.background.default
                          : 'primary.light',
                      borderColor: alpha(theme.palette.primary.main, 0.28),
                      backgroundColor:
                        selectedStack === 'all'
                          ? alpha(theme.palette.primary.light, 0.92)
                          : alpha(theme.palette.primary.main, 0.08),
                    }}
                  />

                  {stackFilters.map((stack) => (
                    <Chip
                      key={stack}
                      label={stack}
                      clickable
                      onClick={() => setSelectedStack(stack)}
                      variant={selectedStack === stack ? 'filled' : 'outlined'}
                      sx={{
                        color:
                          selectedStack === stack
                            ? theme.palette.background.default
                            : 'primary.light',
                        borderColor: alpha(theme.palette.primary.main, 0.28),
                        backgroundColor:
                          selectedStack === stack
                            ? alpha(theme.palette.primary.light, 0.92)
                            : alpha(theme.palette.primary.main, 0.08),
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: 'flex-end',
                flexShrink: 0,
                alignSelf: { xs: 'flex-start', md: 'flex-end' },
              }}
            >
              <IconButton
                onClick={goPrev}
                disabled={!canGoPrev}
                sx={{
                  color: 'primary.light',
                  border: '1px solid',
                  borderColor: canGoPrev ? 'divider' : 'rgba(255,255,255,0.08)',
                  backgroundColor: alpha(theme.palette.background.default, 0.48),
                  backdropFilter: 'blur(10px)',
                  opacity: canGoPrev ? 1 : 0.45,
                  '&:hover': {
                    borderColor: canGoPrev ? alpha(theme.palette.primary.main, 0.42) : 'rgba(255,255,255,0.08)',
                    backgroundColor: canGoPrev ? alpha(theme.palette.background.default, 0.84) : alpha(theme.palette.background.default, 0.48),
                  },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                disabled={!canGoNext}
                sx={{
                  color: 'primary.light',
                  border: '1px solid',
                  borderColor: canGoNext ? 'divider' : 'rgba(255,255,255,0.08)',
                  backgroundColor: alpha(theme.palette.background.default, 0.48),
                  backdropFilter: 'blur(10px)',
                  opacity: canGoNext ? 1 : 0.45,
                  '&:hover': {
                    borderColor: canGoNext ? alpha(theme.palette.primary.main, 0.42) : 'rgba(255,255,255,0.08)',
                    backgroundColor: canGoNext ? alpha(theme.palette.background.default, 0.84) : alpha(theme.palette.background.default, 0.48),
                  },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ position: 'relative', width: '100%', minHeight: { xs: 1280, sm: 760, xl: 380 } }}>
            <AnimatePresence mode="wait">
              {projectPages.length > 0 ? (
                <Box
                  key={`${selectedStack}-${activePage}`}
                  component={motion.div}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      xl: 'repeat(4, minmax(0, 1fr))',
                    },
                    width: '100%',
                    gap: { xs: 2, md: 2.5 },
                  }}
                >
                  {projectPages[activePage].map((project, index) => {
                    const projectNumber = activePage * PROJECTS_PER_PAGE + index + 1

                    return (
                      <TiltedCard
                        key={`${project.title}-${projectNumber}`}
                        minHeight={{ xs: 300, md: 340 }}
                        rotateAmplitude={8}
                        scaleOnHover={1.015}
                      >
                        <Box
                          sx={{
                            minWidth: 0,
                            p: { xs: 3, md: 4 },
                            minHeight: { xs: 300, md: 340 },
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
                          <Stack spacing={3} sx={{ height: '100%', justifyContent: 'space-between' }}>
                            <Stack spacing={2.5}>
                              <Typography
                                variant="overline"
                                sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                              >
                                {projectNumber.toString().padStart(2, '0')}
                              </Typography>

                              <Typography
                                variant="h4"
                                translate="no"
                                className="notranslate"
                                sx={{
                                  color: 'text.primary',
                                  fontSize: { xs: '1.5rem', md: '1.9rem' },
                                  lineHeight: 1.1,
                                }}
                              >
                                {project.title}
                              </Typography>

                              <Typography
                                variant="body1"
                                sx={{
                                  color: 'text.secondary',
                                  lineHeight: 1.8,
                                }}
                              >
                                {
                                  t.projects.items[
                                    project.description as keyof typeof t.projects.items
                                  ]
                                }
                              </Typography>

                              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {project.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
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
                            </Stack>

                            <Button
                              variant="text"
                              color="secondary"
                              endIcon={<LaunchRoundedIcon />}
                              sx={{ alignSelf: 'flex-start', px: 0 }}
                            >
                              {t.projects.viewDetails}
                            </Button>
                          </Stack>
                        </Box>
                      </TiltedCard>
                    )
                  })}
                </Box>
              ) : (
                <Box
                  key={`empty-${selectedStack}`}
                  component={motion.div}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 280,
                    px: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.82)}, ${alpha(theme.palette.background.default, 0.52)})`,
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 520 }}
                  >
                    {t.projects.emptyState}
                  </Typography>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </PageFrame>
  )
}

export default Projects
