import formatISO9075 from 'date-fns/formatISO9075';
export default function Post({post}) {
    return(
        <div className="post">
    <div className="image">
    <img src={'http://localhost:4000/' + post.file}/>
    </div>
    <div className="texts">
    <h2>{post.title}</h2>
    <p className="info">
        <a className="author">{post.author.userName}</a>
        <time>{formatISO9075(post.createdAt)}</time>
    </p>
    <p className="summary">{post.summary}</p>
    </div>
</div>
    )
}