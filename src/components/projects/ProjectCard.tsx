import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { useI18n } from '../../i18n/useI18n'

export type ProjectItem = {
  title: string
  description: string
  tags: string[]
}

type ProjectCardProps = {
  project: ProjectItem
  projectNumber: number
}

function ProjectCard({ project, projectNumber }: ProjectCardProps) {
  const { t } = useI18n()

  return (
    <Box
      sx={{
        minWidth: 0,
        p: { xs: 3, md: 4 },
        minHeight: { xs: 300, md: 340 },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 5,
        background:
          'linear-gradient(180deg, rgba(17, 21, 36, 0.82), rgba(10, 12, 20, 0.62))',
        backdropFilter: 'blur(14px)',
        transition:
          'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(111, 124, 255, 0.42)',
          boxShadow: '0 16px 30px rgba(4, 8, 18, 0.24)',
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
            {project.description}
          </Typography>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
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
  )
}

export default ProjectCard
