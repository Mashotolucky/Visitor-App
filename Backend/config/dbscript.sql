CREATE TABLE public.users(
	ID serial NOT NULL, 
	name varchar(100),
	lastname varchar(100),
	email varchar(100) not null unique,
	password varchar(100) not null,
	role character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);


CREATE TABLE public.tenant(
	ID serial NOT NULL, 
	userID integer,
    building varchar(100),
    officeNo varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
	
);

CREATE TABLE public.admin(
	ID serial NOT NULL, 
	userID integer,
	adminID integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);


ALTER TABLE public.tenant
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.admin
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON public.users (lower(email));
