import formatISO9075 from 'date-fns/formatISO9075';
import { Link } from 'react-router-dom';
export default function Post({post}) {
    return(
    <div className="post">
        <div className="image">
            <Link to={'/post/' + post._id}>
                <img src={'http://localhost:4000/' + post.file}/>
            </Link>
        </div>
        <div className="texts">
            <Link to={'/post/' + post._id}>
                <h2>{post.title}</h2>
            </Link>
            <p className="info">
                <a className="author">{post.author.userName}</a>
                <time>{formatISO9075(post.createdAt)}</time>
            </p>
            <p className="summary">{post.summary}</p>
        </div>
</div>
    )
}