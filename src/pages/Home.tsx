import { Box, Stack, Typography } from '@mui/material'
import PageFrame from '../components/layout/PageFrame'

function Home() {
    return (
        <PageFrame>
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100svh',
                    px: { xs: 3, md: 4 },
                    textAlign: 'center',
                    pointerEvents: 'none',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'radial-gradient(circle at center, rgba(8, 10, 18, 0.26) 0%, rgba(8, 10, 18, 0.13) 22%, rgba(8, 10, 18, 0.04) 38%, rgba(8, 10, 18, 0) 58%)',
                        opacity: 1,
                    }}
                />

                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 920,
                        position: 'relative',
                        zIndex: 1,
                        px: { xs: 1, md: 3 },
                        mx: 'auto',
                        pt: { xs: 10, md: 8 },
                        pb: { xs: 12, md: 8 },
                    }}
                >
                    <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center">
                        <Typography
                            component="p"
                            sx={{
                                mb: 0,
                                color: 'rgba(244, 245, 250, 0.82)',
                                fontFamily: 'var(--mono)',
                                fontSize: { xs: 12, md: 13 },
                                letterSpacing: '0.32em',
                                textTransform: 'uppercase',
                                textShadow: '0 2px 10px rgba(0,0,0,0.42)',
                            }}
                        >
                            Portifólio
                        </Typography>

                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: 760,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: { xs: 170, md: 260 },
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 10, md: 16 },
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    color: 'transparent',
                                    fontSize: {
                                        xs: 'clamp(2.9rem, 15vw, 5rem)',
                                        md: 'clamp(4.8rem, 10vw, 8rem)',
                                    },
                                    fontFamily: "Georgia, 'Times New Roman', serif",
                                    fontWeight: 600,
                                    lineHeight: 0.82,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    opacity: 0.34,
                                    WebkitTextStroke: '1px rgba(245, 247, 255, 0.34)',
                                }}
                            >
                                dev
                            </Typography>

                            <Stack spacing={0} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: '#f8f7fb',
                                        fontSize: {
                                            xs: 'clamp(2.35rem, 10.5vw, 4rem)',
                                            md: 'clamp(3.5rem, 7vw, 5.8rem)',
                                        },
                                        lineHeight: 0.9,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        textShadow:
                                            '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                                    }}
                                >
                                    Vinicius
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        mt: { xs: '-0.08em', md: '-0.04em' },
                                        mr: { xs: '-0.45em', md: '-0.7em' },
                                        color: 'rgba(248, 247, 251, 0.96)',
                                        fontSize: {
                                            xs: 'clamp(1.6rem, 7vw, 2.7rem)',
                                            md: 'clamp(2.4rem, 4.6vw, 3.9rem)',
                                        },
                                        lineHeight: 0.9,
                                        letterSpacing: '0.22em',
                                        textTransform: 'uppercase',
                                        textShadow:
                                            '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                                    }}
                                >
                                    Bariane
                                </Typography>
                            </Stack>
                        </Box>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mx: 'auto',
                                maxWidth: 620,
                                color: 'rgba(232, 234, 242, 0.9)',
                                fontSize: { xs: '0.98rem', md: '1.06rem' },
                                lineHeight: 1.8,
                                textShadow: '0 2px 14px rgba(0,0,0,0.48)',
                            }}
                        >
                            Programação fullstack com experiência em desenvolvimento em PHP, Javascript, React,
                            .NET e outras tecnologias.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </PageFrame>
    )
}

export default Home
