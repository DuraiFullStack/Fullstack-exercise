const InputCard = (props) => {
    return (
        <>
            <input
                type="text"
                placeholder="enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="enter description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <input type="button" onClick={getValue} value="create" />
        </>
    );
}