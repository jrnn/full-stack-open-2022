CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (
    author,
    title,
    url,
    likes
) VALUES (
    'Beany McBeanface',
    'All About Coffee',
    'http://all.about.kovfefe',
    42
);

INSERT INTO blogs (
    author,
    title,
    url
) VALUES (
    'Boaty McBoatface',
    'All About Boats',
    'http://all.about.beaowts'
);
