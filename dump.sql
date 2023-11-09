CREATE TABLE videos (
    id UUID PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    inactivatedAt TIMESTAMP WITH TIME ZONE,
    deletedAt TIMESTAMP WITH TIME ZONE
);