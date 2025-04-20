export default function About({
    children,
    company1,
    company2,
}: {
    children: React.ReactNode
    company1: React.ReactNode
    company2: React.ReactNode
}) {
    return (
        <div className="P-About">
            {children}
            {company1}
            {company2}
        </div>
    )
}