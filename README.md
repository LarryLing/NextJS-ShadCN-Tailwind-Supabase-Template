<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/LarryLing/NextJS-ShadCN-Tailwind-Supabase-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NextJS + ShadCN/Tailwind + Supabase Template</h3>

  <p align="center">
    <a href="https://github.com/LarryLing/NextJS-ShadCN-Tailwind-Supabase-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#supabase-connection">Supabase Connection</a></li>
            <li><a href="#user-profiles-table">User Profiles Table</a></li>
            <li><a href="#email-templates">Email Templates</a></li>
            <li><a href="#avatar-storage-bucket">Avatar Storage Bucket</a></li>
            <li><a href="#oauth-third-party-providers">OAuth Third-Party Providers</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This repository provides a simple and flexible starting point for building web applications with essential features like basic navigation, authentication, and authorization. It’s designed to give you a fast and easy setup to kickstart your project with a clean structure and built-in security features.

### Features

- Basic Navigation: A simple and responsive navigation system with links to pages with suspense shadows.
- User Authentication: Built-in user authentication functionality including login, registration, and password recovery.
- Authorization: Role-based access to manage user permissions and restrict access to certain areas of the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![Typescript][Typescript]][Typescript-url]
- [![Tailwind][TailwindCSS]][Tailwind-url]
- [![ShadCN][ShadCN]][ShadCN-url]
- [![RadixUI][RadixUI]][RadixUI-url]
- [![Supabase][Supabase]][Supabase-url]
- [![Postgres][Postgres]][Postgres-url]
- [![Vercel][Vercel]][Vercel-url]
- [![Zod][Zod]][Zod-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
    ```sh
    npm install npm@latest -g
    ```
- Please have a Supabase account with a brand new project before preceeding

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/LarryLing/NextJS-ShadCN-Tailwind-Supabase-Template.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Change git remote url to avoid accidental pushes to base project
    ```sh
    git remote set-url origin github_username/NextJS-ShadCN-Tailwind-Supabase-Template
    git remote -v
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Supabase Connection

1. Create a `.env.local` file in the root directory with the following fields
    ```sh
    NEXT_PUBLIC_SUPABASE_URL=<SUPABASE_URL>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
    ```
2. Create a new Supabase project and replace `<YOUR_SUPABASE_URL>` and `<SUPABASE_ANON_KEY>`
   with the connection variables provided by Supabase

3. Make sure your `.gitignore` file contains `.env.local` before pushing to a public repository

### User Profiles Table

1. Inside your Supabase project dashboard, navigate to the SQL Editor and run the following queries

    ```sh
    CREATE TABLE profiles (
        id UUID PRIMARY KEY DEFAULT auth.uid(),
        display_name TEXT NOT NULL,
        email TEXT NOT NULL DEFAULT auth.email() UNIQUE,
        avatar TEXT,
        role TEXT NOT NULL DEFAULT 'other',
        bio TEXT DEFAULT ''
    );

    ALTER TABLE profiles
        ADD CONSTRAINT fk_user
        FOREIGN KEY (id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE;

    ALTER TABLE profiles
        ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "User can only update own profile data"
    ON profiles
    FOR UPDATE
    TO public
    USING (
        (auth.uid() = id)
    );

    CREATE POLICY "Users can select profile data"
    ON profiles
    FOR SELECT
    TO public
    USING (
        (auth.role() = 'authenticated')
    );
    ```

    ```sh
    CREATE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
        INSERT INTO public.profiles(id, display_name, email)
        VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name', NEW.email);
        RETURN NEW;
    END;
    $$;

    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

    CREATE FUNCTION public.handle_update_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
        UPDATE public.profiles
        SET email = NEW.email
        WHERE id = NEW.id;
        RETURN NEW;
    END;
    $$;

    CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_update_user()

    CREATE FUNCTION public.handle_password_change("current" text, "new" text, "userid" uuid)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    DECLARE encpass auth.users.encrypted_password%type;
    BEGIN
        SELECT encrypted_password
        FROM auth.users
        INTO encpass
        WHERE id = userid and encrypted_password = crypt(current, auth.users.encrypted_password);

        IF NOT FOUND THEN
            RETURN false;
        ELSE
            UPDATE auth.users SET encrypted_password = crypt(new, gen_salt('bf')) WHERE id = userid;
            RETURN true;
        END IF;
    END;
    $$;

    CREATE FUNCTION public.handle_delete_user()
    RETURNS VOID
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
        DELETE FROM auth.users WHERE auth.uid()  = id;
    END
    $$;
    ```

### Email Templates

1. Navigate to the Email Templates subsection within the Authentication section of the project dashboard and enter the following markup for the `Confirm Signup` email.

    ```sh
    <h2>Confirm your signup</h2>

    <p>Follow this link to confirm your user:</p>
    <p>
        <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup">Confirm your mail</a>
    </p>
    ```

2. Enter the following markup for the `Reset Password` email.

    ```sh
    <h2>Reset Password</h2>

    <p>Follow this link to reset the password for your user:</p>
    <p>
        <a href="{{ .SiteURL }}/auth/recovery?token_hash={{ .TokenHash }}&type=recovery">Reset Password</a>
    </p>
    ```

### Avatar Storage Bucket

1. Navigate to the Storage section in the Supabase project dashboard and create a new public bucket named `avatars`

2. Return to the SQL Editor section and run the following queries

    ```sh
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "User can select objects" ON storage.objects FOR SELECT
    USING (auth.role() = 'authenticated');

    CREATE POLICY "User can upload in their own folders (in any bucket)"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        (storage.foldername(name))[1] = (select auth.uid()::text)
    );

    CREATE POLICY "User can update in their own folders (in any bucket)"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    WITH CHECK (
        (storage.foldername(name))[1] = (select auth.uid()::text)
    );

    CREATE POLICY "User can delete their own objects (in any bucket)"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        owner = (select auth.uid())
    );
    ```

### OAuth Third Party Providers

This template comes ready Discord and Github social authentication. If you want to add
additional social authenticators, please refer to the [Supabase documentation](https://supabase.com/docs/guides/auth/social-login)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add navbar popovers
    - [x] User popover
    - [x] Avatar popover
- [x] Add error handling
    - [x] Add error page(s)
    - [x] Redirect user to signup page with an error if email is taken
    - [x] Sign out page refresh
- [x] Add settings page template
    - [x] Create UI
    - [x] Fix backdrop bug
    - [x] Close other UI on dialog open
    - [x] Enable users to upload custom profile pictures
    - [x] Profile updates
    - [x] Password recovery
    - [x] Email updates
- [x] Implement "Forgot Password" functionality
- [x] Add delete account functionality
    - [x] Remove user from database
    - [x] Delete all storage objects owned by deleted user
- [ ] Display toast on successful email form submits
- [ ] Implement shadow for suspense rendering
- [x] Update README with instructions for use

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Larry Ling - [LinkedIn](https://www.linkedin.com/in/larry-ling-student/) - larryling.main@gmail.com

Project Link: [NextJS-ShadCN-Tailwind-Supabase-Template](https://github.com/LarryLing/NextJS-ShadCN-Tailwind-Supabase-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [NextJS Docs](https://nextjs.org/docs)
- [NextJS Discord](https://discord.gg/nextjs)
- [Supabase Docs](https://supabase.com/docs)
- [Supbase Discord](https://discord.gg/s2T8BBtU)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete%20%20-guide-grid/)
- [Transform Tools](https://transform.tools/)
- [Lucide Icons](https://lucide.dev/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Markdown Badges](https://github.com/Ileriayo/markdown-badges/blob/master/README.md#-design)
- [Badges 4 Markdown](https://github.com/alexandresanlim/Badges4-README.md-Profile)
- [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindui.com/
[ShadCN]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[ShadCN-url]: https://ui.shadcn.com/
[RadixUI]: https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white
[RadixUI-url]: https://www.radix-ui.com/
[Supabase]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Zod]: https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white
[Zod-url]: https://zod.dev/
