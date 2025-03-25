import "./home-marketing.css"
export function HomeMarketing({title, subtitle}) {
    return (
        <div>
            <h1 className="marketing-title-name">{title}</h1>
            <h3 className="subtitle-marketing">{subtitle}</h3>
        </div>
    )
}
