package gov.nyc.doitt.nyc.gis.gradle

import java.util.List
import com.google.javascript.jscomp.CommandLineRunner
import com.google.javascript.jscomp.CompilationLevel
import com.google.javascript.jscomp.Compiler
import com.google.javascript.jscomp.CompilerOptions
import com.google.javascript.jscomp.WarningLevel
import com.google.javascript.jscomp.SourceFile
import com.google.javascript.jscomp.Result
import com.google.javascript.jscomp.SourceMap
import org.gradle.api.GradleException

class JsMinifier {
	void minify(
		String libName,
		String version,
		List<String> fileNames,
		String sourceDir,
		String destinationDir,
		String compilationLevel,
		String warningLevel,
		String comment,
		List<String> morerOptions
	){
        CompilerOptions opts = new CompilerOptions()
        opts.setSourceMapOutputPath("${destinationDir}/${libName}.sourcemap.json")
		CompilationLevel.valueOf(compilationLevel).setOptionsForCompilationLevel(opts)
		WarningLevel.valueOf(warningLevel).setOptionsForWarningLevel(opts)
		List<SourceFile> sources = new ArrayList<SourceFile>()
		fileNames.each { fileName -> 
			File inputFile = new File("${sourceDir}/${fileName}")
			if (!inputFile.exists()){
				throw new FileNotFoundException("${sourceDir}/${fileName}")
			}
			SourceFile sourceFile = SourceFile.fromFile(inputFile)
			sources.add(sourceFile)
        }
		Compiler compiler = new Compiler()
        Result result = compiler.compile(CommandLineRunner.getDefaultExterns(), sources, opts)
        writeOutput(
        	compiler, 
        	sourceDir,
        	result, 
        	getOutputFile(libName, version, destinationDir), 
        	getSourceMapFile(libName, version, destinationDir), 
			getWrapper(libName, version, comment)
        )
    }
	private File getOutputFile(String libName, String version, String destinationDir){
		String destination = destinationDir.replaceAll('\\\\', '/')
		File dir = new File(destination)
		dir.mkdirs()
		return new File("${dir}/${libName}.js")
	}
	private File getSourceMapFile(String libName, String version, String destinationDir){
		String destination = destinationDir.replaceAll('\\\\', '/')
		File dir = new File(destination)
		dir.mkdirs()
		return new File("${dir}/${libName}.sourcemap.json")
	}
	private List<String> getWrapper(String libName, String version, String comment){
		String prefix
		String name = "${libName}-${version}"
		if (comment != null){
			prefix = "/*\n\n${name}\n\n${comment}\n\n*/\n"
		}else{
			prefix = "/*\n\n${name}\n\n*/\n"
		}
		String suffix = "\n//#sourceMappingURL=${libName}.sourcemap.json"
		return [prefix, suffix]
	}
	private void setLocationMapping(SourceMap sourceMap, String sourceDir){
		String sourcePath = sourceDir.replaceAll('\\\\', '/')
		int lastSlash = sourcePath.lastIndexOf('/')
		String prefix = sourcePath.substring(0, lastSlash)
		sourceMap.setPrefixMappings([new SourceMap.LocationMapping(prefix, '../src')])
	}
	private void writeOutput(Compiler compiler, String sourceDir, Result result, File outputFile, File sourceMapFile, List<String> wrapper){
		if (result.success) {
        	SourceMap sourceMap = compiler.getSourceMap()
        	sourceMap.setWrapperPrefix(wrapper[0]);
        	setLocationMapping(sourceMap, sourceDir)
        	outputFile.text = wrapper[0]
			outputFile.append(compiler.toSource())
			outputFile.append(wrapper[1])
			StringBuffer sourceMapJson = new StringBuffer()
			sourceMap.appendTo(sourceMapJson, outputFile.name)
			sourceMapFile.text = sourceMapJson.toString()
        } else {
        	String error = ''
            result.errors.each {
                error += "${it.sourceName}:${it.lineNumber} - ${it.description}\n"
            }
            throw new GradleException(error)
        }
	}
}