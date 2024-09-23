
export const ScreenError = ({ error, description }: { error: string, description: string }) => {

    return (
        <div style={{ alignSelf: 'center', justifySelf: 'center' }}>
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Error: {error}</h1>
            <p>{description}</p>
        </div>
    )
}