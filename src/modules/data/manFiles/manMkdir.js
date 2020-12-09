import manFile from '../../model/manFile';

const manMkdir = new manFile(


        (`
        <div  class = 'h2Item'>
        <h2>Name</h2>
        <p>mkdir - make directories</p>
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Synopsis</h2>
        <b>mkdir</b> [<i>OPTION</i>]... <i>DIRECTORY</i>...
        </div>
        `),

        (`
        <div  class = 'h2Item'>
        <h2>Description</h2>
        <p>Create the DIRECTORY(ies), if they do not already exist.
        <p>Mandatory arguments to long options are mandatory for short options too.
        <dl compact>
        <dt><b>-m</b>, <b>--mode</b>=<i>MODE</i>
        <dd>set file mode (as in chmod), not a=rwx - umask
        <dt><b>-p</b>, <b>--parents</b>
        <dd>no error if existing, make parent directories as needed
        <dt><b>-v</b>, <b>--verbose</b>
        <dd>print a message for each created directory
        <dt><b>-Z</b>, <b>--context</b>=<i>CTX</i>
        <dd>set the SELinux security context of each created directory to CTX
        <dt><b>--help</b>
        <dd>display this help and exit
        <dt><b>--version</b>
        <dd>output version information and exit</dl>
        <h2>Description</h2>
        <b>mkdir</b>() attempts to create a directory named <i>pathname</i>.
        <p>The argument <i>mode</i> specifies the permissions to use. It is modified by the process's <i>umask</i> in the usual way: the permissions of the created
        directory are (<i>mode</i> &amp; ~<i>umask</i> &amp; 0777). Other mode bits of the created directory depend on the operating system. For Linux, see below.
        <p>The newly created directory will be owned by the effective user ID of the process. If the directory containing the file has the set-group-ID bit set, or if
        the file system is mounted with BSD group semantics (<i>mount -o bsdgroups</i> or, synonymously <i>mount -o grpid</i>), the new directory will inherit the
        group ownership from its parent; otherwise it will be owned by the effective group ID of the process.
        <p>If the parent directory has the set-group-ID bit set then so will the newly created directory.
        </div>
        `),
        
        (`
        <div  class = 'h2Item'>
        <h2>Return Value</h2>
        <b>mkdir</b>() returns zero on success, or -1 if an error occurred (in which case,
        <i>errno</i> is set appropriately).
        <h2>Errors</h2>
        <dl compact>
        <dt><b>EACCES</b>
        <dd>The parent directory does not allow write permission to the process, or one of the directories in <i>pathname</i> did not allow search permission. 
        <dt><b>EDQUOT</b>
        <dd>The user's quota of disk blocks or inodes on the file system has been exhausted.
        <dt><b>EEXIST</b>
        <dd><i>pathname</i> already exists (not necessarily as a directory). This includes the case where <i>pathname</i> is a symbolic link, dangling or not.
        <dt><b>EFAULT</b>
        <dd><i>pathname</i> points outside your accessible address space.
        <dt><b>ELOOP</b>
        <dd>Too many symbolic links were encountered in resolving <i>pathname</i>.
        <dt><b>EMLINK</b>
        <dd>The number of links to the parent directory would exceed <b>LINK_MAX</b>.
        <dt><b>ENAMETOOLONG</b>
        <dd><i>pathname</i> was too long.
        <dt><b>ENOENT</b>
        <dd>A directory component in <i>pathname</i> does not exist or is a dangling symbolic link.
        <dt><b>ENOMEM</b>
        <dd>Insufficient kernel memory was available.
        <dt><b>ENOSPC</b>
        <dd>The device containing <i>pathname</i> has no room for the new directory.
        <dt><b>ENOSPC</b>
        <dd>The new directory cannot be created because the user's disk quota is exhausted.
        <dt><b>ENOTDIR</b>
        <dd>A component used as a directory in <i>pathname</i> is not, in fact, a directory.
        <dt><b>EPERM</b>
        <dd>The file system containing <i>pathname</i> does not support the creation of directories.
        <dt><b>EROFS</b>
        <dd><i>pathname</i> refers to a file on a read-only file system.</dl>
        <h2>Conforming to</h2>
        SVr4, BSD, POSIX.1-2001.
        <h2>Notes</h2>
        Under Linux apart from the permission bits, only the <b>S_ISVTX</b> mode bit is honored. That is,
        under Linux the created directory actually gets mode (<i>mode</i> &amp; ~<i>umask</i> &amp; 01777).
        <p>There are many infelicities in the protocol underlying NFS. Some of these affect <b>mkdir</b>().
        </div>
        `),
        
        (`
        <div  class = 'h2Item'>
        <h2>Author</h2>
        Written by David MacKenzie.
        </div>
        `)
    
    );

module.exports = { manMkdir };