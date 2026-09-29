export default async function Home(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        cache: 'force-cache'
    });   

    const store = await response.json();
    
    return (
        <div>
            {store.slice(0,5).map((post: { id: number; title: string }) => (
                <p key={post.id}>{post.title}</p>
            ))}
            {new Date().toISOString()}
        </div>
    )
}